import http from "http";
import url from "url";
import { getFile } from "./route/route";

const server = http.createServer(getFile);

server.listen(8080);
