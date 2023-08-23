function multiply(a: number, b: number) {
  return a * b;
}


const req = {
  params: {
    id: "42"
  }
};

const listId = parseInt(req.params.id);
// const listId = req.params.id;


console.log(multiply(5, listId)); // TypeScript s'assure que notre fonction est appelé uniquement avec des numbers et pas des string.


