import { Excerise } from "./exercise.model";
import { Injectable, inject } from "@angular/core";
import { Subject } from "rxjs";
import { Firestore, collection, collectionData, addDoc } from '@angular/fire/firestore';
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class TrainingService {
    excersieChanged = new Subject<Excerise | null>();
    excersiesChanged = new Subject<Excerise[]>();
    private availableExercises: Excerise[] = [];
    private runningExercise: Excerise | null = null;
    private excerises: Excerise[] = [];
    finishedExcerisesChanged = new Subject<Excerise[]>();

    // Use inject() to get Firestore instance within the injection context
    private db: Firestore = inject(Firestore);

    fetchAvailableExcerises() {
        // Create collection reference within a method call (injection context)
        const exercisesCollection = collection(this.db, 'availableExercises');

        // Use the collection reference to get data
        collectionData(exercisesCollection, { idField: 'id' }).pipe(
            map(docArray => {
                console.log("doc array", docArray);
                return docArray.map(doc => {
                    return {
                        id: doc.id,
                        name: doc['name'],
                        duration: doc['duration'],
                        calories: doc['calories']
                    };
                });
            })
        ).subscribe(exercises => {
            this.availableExercises = exercises;
            this.excersiesChanged.next([...this.availableExercises]);
        });
    }

    startExercise(selectedId: string) {
        this.runningExercise = this.availableExercises.find(
            ex => ex.id === selectedId
        ) ?? null;
        if (this.runningExercise) {
            this.excersieChanged.next({ ...this.runningExercise });
        }
    }

    completeExercise() {
        if (this.runningExercise) {
            this.addDataToDatabase({
                id: this.runningExercise.id,
                name: this.runningExercise.name,
                duration: this.runningExercise.duration,
                calories: this.runningExercise.calories,
                date: new Date(),
                state: 'completed'
            });
            this.runningExercise = null;
            this.excersieChanged.next(null);
        }
    }

    cancelExercise(progress: number) {
        if (this.runningExercise) {
            this.addDataToDatabase({
                id: this.runningExercise.id,
                name: this.runningExercise.name,
                duration: this.runningExercise.duration * (progress / 100),
                calories: this.runningExercise.calories * (progress / 100),
                date: new Date(),
                state: 'cancelled'
            });
            this.runningExercise = null;
            this.excersieChanged.next(null);
        }
    }

    getRunningExercise() {
        return { ...this.runningExercise };
    }

    fetchCompletedOrCancelledExercises() {
        // Create collection reference within a method call (injection context)
        const finishedExercisesCollection = collection(this.db, 'finishedExercises');

        // Use the collection reference to get data
        collectionData(finishedExercisesCollection, { idField: 'id' }).pipe(
            map((docArray: any[]) => {
                return docArray.map(doc => {
                    // Convert Firestore Timestamp to JavaScript Date
                    const dateValue = doc['date'];
                    let convertedDate: Date;

                    if (dateValue && typeof dateValue.toDate === 'function') {
                        // If it's a Firestore Timestamp, convert to Date
                        convertedDate = dateValue.toDate();
                    } else if (dateValue instanceof Date) {
                        // If it's already a Date, use it as is
                        convertedDate = dateValue;
                    } else {
                        // Fallback to current date if the date is invalid
                        convertedDate = new Date();
                    }

                    return {
                        id: doc.id,
                        name: doc['name'],
                        duration: doc['duration'],
                        calories: doc['calories'],
                        date: convertedDate,
                        state: doc['state']
                    } as Excerise;
                });
            })
        ).subscribe((excerises: Excerise[]) => {
            this.finishedExcerisesChanged.next(excerises);
        });
    }
    
    private addDataToDatabase(excerise: Excerise) {
        // Create collection reference within a method call (injection context)
        const finishedExercisesCollection = collection(this.db, 'finishedExercises');

        // Use addDoc to add the exercise to the collection
        addDoc(finishedExercisesCollection, excerise).then(() => {
            console.log('Exercise added to database');
        }).catch(error => {
            console.error('Error adding exercise to database', error);
        });
    }
}
