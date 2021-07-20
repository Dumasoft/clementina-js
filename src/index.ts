import {DataBase} from "./core/database/DataBase";
import {Alert} from "./core/elements/alert/Alert";
import {TypeSystemMessages} from "./core/enums/events/TypeSystemMessages";

const tables = {
    name: 'todo',
    options: {keyPath: 'title'}
}

const database = new DataBase('notas', 1, [tables])


setTimeout(() => {
    database.insert_item('todo', {title: 'leer', text: 'hacerlo por la mañana'})
}, 5000)

const message = new Alert({destroy: true}, document)
const element = document.createElement('div')
document.body.appendChild(element)
message.create(element, TypeSystemMessages.SUCCESS, 'Esto es un mensaje de prueba')
