function parseCPF(str) {
  const pattern = /^(([0-9]){3}\.){2}([0-9]){3}-([0-9]){2}$/;
  return pattern.test(str);
}

function parseEmail(str) {
  const pattern =
    /^([0-9a-zA-Z]+([_.-]?[0-9a-zA-Z]+)*@[0-9a-zA-Z]+[0-9,a-z,A-Z,.,-]*(.){1}[a-zA-Z]{2,4})+$/;

  return pattern.test(str);
}

export { parseCPF, parseEmail };
