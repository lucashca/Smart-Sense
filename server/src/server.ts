
import app from './app'
import { monitorEventLoopDelay } from 'perf_hooks';

const server = app.express;

server.listen(3000)

app.requestDeviceInfo('http://192.168.43.10')
//app.requestDeviceInfo('http://192.168.43.12')
//app.requestDeviceInfo('http://192.168.43.11')
