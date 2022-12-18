import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
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
    <div className='flex flex-col items-center'>
      <div className='mt-10'>
        <h1 className='text-4xl font-bold'>App Title.</h1>
      </div>
      <div className='w-64 mt-10'>
        <Form<LoginValues, typeof schema>
          onSubmit={(values) => {
            login(values).then(() => navigate('/'))
          }}
          schema={schema}
        >
          {({ register, formState }) => (
            <>
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
              <div>
                <button
                  type='submit'
                  className='text-center border-2 rounded-lg w-full py-1 hover:bg-gray-200 duration-300'
                >
                  Log in
                </button>
              </div>
            </>
          )}
        </Form>
      </div>
    </div>
  )
}
