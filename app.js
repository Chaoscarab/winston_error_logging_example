let app = require('express')
let winston = require('winston')

const { combine, timestamp, json, errors} = winston.format

const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    //setting up the formate for 
    formate: combine(timestamp(), errors({stack: true}), json())/*winston.format.json()*/,
    transports: [
        //logs winston messages to console:
        //new winston.transports.Console()
        new winston.transports.File({filename: 'standard.log'})
    ],
    exceptionHandlers:[
        //allows for logging of uncaught exceptions:
        new winston.transports.File({filename: 'exceptions.log'})
    ],
    rejectionHandlers: [
        //allows for logging of unhandled promise rejections:
        new winston.transports.File({filename: 'rejections.log'})
    ],
    //default metadata allows for easy searching
    defaultMeta: { service: 'user-service' }
})

logger.info('Hello world')
logger.log('info', 'Hello again')

//creating a child logger
function helloWorld() {
    const childLogger = logger.child({
        requestId: '12345'
    })
    childLogger.info('info message')
}

//logging an error
logger.error(new Error('an error'))
throw new Error('another error')
helloWorld()