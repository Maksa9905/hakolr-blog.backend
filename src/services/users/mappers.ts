import { DetailedUserDto, UserDto } from '#dtos/user'

export const mapUserInfo = ({ password, ...user }: DetailedUserDto) => {
  const body: UserDto = user

  return body
}
