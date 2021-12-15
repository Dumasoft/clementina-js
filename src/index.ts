import {DataBase} from "./core/database/data.base";
import {Alert} from "./core/elements/alert/alert";
import {TypeSystemMessages} from "./core/enums/events/type.system.messages";

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
