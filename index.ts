import {Observable} from "rxjs/internal/Observable";

export * from './core/base';

function prueba(): Observable<string> {
    return new Observable<string>((observer) => {
        setInterval(() => {
            observer.next('hola');
        }, 1000);
    })
}

prueba().subscribe(
    (response: string) => console.log(response)
);
