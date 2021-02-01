import supiAPI from "../config/api";

export async function signUp(data) {
  const response = await supiAPI.post('/api/auth/sign_up', data);
  return response.data
}