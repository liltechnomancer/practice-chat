const { secureStore, checkPass } = require('../authentication/password')

test('hashes a users pass for storage', async () => {
  expect.assertions(5)
  const user = { name: 'Levi', password: 'password' }
  const store = jest.fn(pass => (user.hash = pass))
  const get = jest.fn(_ => Promise.resolve(user.hash))

  await secureStore(store, user.password)
  await expect(user.hash).not.toEqual(user.password)
  await expect(checkPass(get, user.password)).resolves.toEqual(true)
  await expect(checkPass(get, 'other')).resolves.toEqual(false)
  await expect(store).toHaveBeenCalled()
  await expect(get).toHaveBeenCalled()
})
