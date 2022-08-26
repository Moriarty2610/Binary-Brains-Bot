const Discord = require("Discord.js")
const fetch = require("node-fetch")
const client = new Discord.client()

client.on("ready", () => {
    console.log('Logged in as ${client.user.tag}!')   
})

client.on("message" , msg => {
    if (msg.auther.bot) return
    let message = msg.content
    if (message[0] != '$') return
    let part1 = ""
    let i = 1 ;
    while(message[i]!=' '){
        part1 += message[i]
        i++
    }
    i++
    let uname = ""
    while(message[i]!=' '){
        uname += message[i]
    }
    i++

    //if(part1 === 'login')  
})

client.login() //TOKEN