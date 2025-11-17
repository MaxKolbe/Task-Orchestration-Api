import mongoose, {Document, Schema, ObjectId} from "mongoose"

export interface ITodo extends Document{ 
    uid: number,
    task: string,
    isDone: boolean
}

const TodoSchema: Schema = new Schema({
    uid: {
        type: Number
    },
    task: {
        type: String,
        required: true
    },
    isDone: {
        type: Boolean
    }
})

export default mongoose.model<ITodo>("todos", TodoSchema)