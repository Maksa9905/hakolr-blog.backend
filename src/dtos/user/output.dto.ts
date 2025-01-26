export interface UserDto {
  _id: string
  email: string
  name: string
}

export interface DetailedUserDto extends UserDto {
  password: string
}
