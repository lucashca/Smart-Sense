
import app from './app'
import { monitorEventLoopDelay } from 'perf_hooks';

const server = app.express;

server.listen(3000)

app.requestDeviceInfo('http://192.168.0.10')
