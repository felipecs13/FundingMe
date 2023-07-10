export interface IProject {
  name_project: string
  description: string
  image: string
  goal_amount: number
  current_amount: number
  owner: string
  category: string
  location: string
  created_at: string
  end_date: string
  minimum_donation: number
}

export interface IDataProject extends IProject {	
  bank_account: string;
  id: number;
  state_project: string;
  type_project: string;
  updated_at: string;
  user_id: number;
}

export interface IUser {
  token: string
  id: number
  email: string
  rut: string
  name: string
  is_admin: boolean
}

export interface IProfile {
  image: string
  name: string
  email: string
  rut: string
  bankAccount: string
}

export interface IComment {
  id: number
  user_id: number
  project_id: number
  comment_text: string
  state: string
  created_at: string
  updated_at: string
}

export interface IDonation {
  id: number
  user_id: number
  project: Object
  amount: number
  created_at: string
  updated_at: string
}