// import { useRouter } from 'next/navigation';
import LoginForm from './loginForm';
// import Login_Form from './actions'


export default function LoginPage({sideHidden}) {

  return (
    <div>
      <LoginForm sideHidden={sideHidden}/>
    </div>
  );

}
