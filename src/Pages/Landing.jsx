import React,{useEffect} from 'react'
import { Button } from "@nextui-org/button";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Landing() {
  const {accessToken} = useSelector((state)=> state.authLogin)
  const navigate = useNavigate()
  useEffect(()=>{
  if (accessToken){
    navigate('/dashboard')
  }
  },[])

  return (
    <>
      <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-[#0f0f10] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl text-white font-bold tracking-tight  sm:text-5xl lg:text-6xl">
            Streamline Your Email{" "}
            <span className="text-green-400">Workflow</span>.
          </h1>
          <p className="mt-6 text-white text-lg leading-8 text-muted-foreground">
            Effortlessly schedule and automate your emails, ensuring timely
            communication with every contact,Plan, schedule, and send your
            emails with precision, optimizing your communication process.
          </p>
          <Link to="/login">
            <Button
              color="success"
              className="mt-8  font-semibold"
              radius="sm"
              size="md"
            >
              Get Started <i class="fa-solid fa-arrow-right"></i>
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Landing