import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, ElementRef, Signal, signal, ViewChild, viewChild, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, JsonPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {


  constructor() {
    effect((onCleanup) => {
      let consoleMessage = `signalName has been changed new value : ${this.signalName()}`;

      console.log(consoleMessage);


    });
  }
  numberSignal: WritableSignal<number> = signal<number>(5);
  objectSignal: WritableSignal<Person> = signal<Person>({
    name: "emir",
    surname: "koç",
    age: 22
  });

  signalName: WritableSignal<string> = signal<string>("");
  signalSurname: WritableSignal<string> = signal<string>("");

  computedSignal: Signal<string> = computed<string>(() => {
    return this.signalName() + this.signalSurname();
  });

  number: number = 0;
  name: string = "";
  surname: string = "";


  inrementNumberSignal() {
    this.numberSignal.update(data => ++data)
  }

  setInput1Value(): void {
    this.numberSignal.set(this.number);
  }

  setObjectSignal(): void {
    this.objectSignal.set({ ...this.objectSignal(), age: 33 });
  }

  nameChanged() {
    this.signalName.set(this.name);
  }

  surnameChanged() {
    this.signalSurname.set(this.surname);
  }


}

type Person = {
  name: string,
  surname: string,
  age: number
}