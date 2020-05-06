import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

export default api;

/**
 * Aqui estou usando uma biblioteca que é o json-server
 * que basicamente cria um endpoint fake que eu nomeei
 * no arquivo server.json
 *
 * Para rodar o server fake, abro o terminal e digito
 * o comando: `yarn json-server server.json -p 3333`
 * daria para colocar a flag -w se fosse alterar esse
 * arquivo. Esta tática é para simular uma api antes de
 * ter uma api funcional feita no backend.
 */
