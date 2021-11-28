export interface ITodo {
  id: number
  text: string
  completed: boolean
}

export type FiltersType = 'all' | 'active' | 'completed'
