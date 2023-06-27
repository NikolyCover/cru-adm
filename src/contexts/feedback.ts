import { atom } from 'recoil'

export type FeedbackType = 'none' | 'success' | 'error'

interface Feedback {
	value: FeedbackType
	message: string
}

export const feedbackAtom = atom<Feedback>({
    key: 'feedback-atom',
    default: {
        value: 'none',
        message: ''
    }
})
