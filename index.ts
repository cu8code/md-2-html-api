function l(a: any) {
  return console.log(a);
}

async function rn(newFile: string, oldFile: string) {
  const newFileHandeler = await Deno.create(newFile);
  const oldFileHandeler = await Deno.readFile(oldFile);
  newFileHandeler.write(oldFileHandeler);
  Deno.remove(oldFile);
}

async function getAllDir(a: string, depth: number) {
  const fileArray: Array<string> = [];
  for await (const d of Deno.readDir(a)) {
    if (d.isDirectory) fileArray.push(a + "/" + d.name);
  }
  if (depth <= 1) {
    return;
  }
  return fileArray;
}

async function getAllMdFile(arr: Array<string> | string) {
  const mdFileArray: Array<string> = [];
  if (typeof arr == "string") {
    return;
  }
  for (const i of arr) {
    const data = Deno.readDir(i);
    for await (const j of data) {
      if (j.isFile) {
        const d = j.name.match(/().md/g);
        if (d === null) {
          continue;
        } else if (d == [ ".md" ]) {
          mdFileArray.push(i + "/" + j.name);
        }
      }
    }
  }
  return mdFileArray;
}

l(await getAllMdFile(["."]));

export const rules = {
  h1: {
    re: /#\s?([^{#,\n}]+)/g,
    temp: `<h1>$1</h1>`,
  },
  h2: {
    re: /#{2}\s?([^{#,\n}]+)/g,
    temp: `<h2>$1</h2>`,
  },
  h3: {
    re: /#{3}\s?([^{#,\n}]+)/g,
    temp: `<h3>$1</h3>`,
  },
  link: {
    re: /\[([^\[]*)\]\(([^\[\s]*)\)/g,
    temp: `<a src="$2">$1</a>`,
  },
  code: {
    re: /(?:[^\\']|\\\\|\\')*/g,
    temp: `<a src="$2">$1</a>`,
  },
};
