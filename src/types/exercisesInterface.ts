export interface ExerciseCreate {
  body: string;
  name: string;
  description: string;
  image: string;
}

export interface ExerciseUpdated extends ExerciseCreate {
  id: string;
}
