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