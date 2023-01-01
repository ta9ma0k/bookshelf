import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { RoundedButton } from '../../components/Button'
import { Form, InputField } from '../../components/Form'
import { login } from './api'

const schema = z.object({
  email: z.string().min(1, 'Required'),
  password: z.string().min(1, 'Required'),
})

type LoginValues = {
  email: string
  password: string
}

export const Login = () => {
  const navigate = useNavigate()

  return (
    <>
      <div className='my-10'>
        <h1 className='text-4xl font-bold'>App Title.</h1>
      </div>
      <Form<LoginValues, typeof schema>
        onSubmit={(values) => {
          login(values).then(() => navigate('/'))
        }}
        schema={schema}
      >
        {({ register, formState }) => (
          <div className='flex flex-col space-y-5'>
            <InputField
              type='email'
              label='Email Address'
              error={formState.errors.email}
              registration={register('email')}
            />
            <InputField
              type='password'
              label='Password'
              error={formState.errors.password}
              registration={register('password')}
            />
            <RoundedButton type='submit'>Log in</RoundedButton>
          </div>
        )}
      </Form>
    </>
  )
}
