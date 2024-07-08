const EventEmitter = require('events');

const customeEmitter = new EventEmitter()

customeEmitter.on('response', (name, id) => {
    console.log(`Data received with ${name} and id:${id}`);
})
customeEmitter.on('response', () => {
    console.log(`some other logic here`);
})

customeEmitter.emit('response', 'john', 34)