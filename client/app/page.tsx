import Form from "./components/Form";
import { ToastContainer } from 'react-toastify';
export default function Home() {

  return (
    <div className="flex justify-center items-center bg-sky-300 min-h-screen py-2">
      <ToastContainer />
      <Form />
    </div>
  )
}
