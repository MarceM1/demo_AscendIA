import Image from 'next/image'
import React from 'react'

const AsideLoginForm = () => {
  return (
     <div className="flex flex-col w-[80%] mx-auto gap-18 justify-center items-center">
          <Image
            src="/AscendIA_logo.svg"
            width={300}
            height={300}
            alt="AscendIA Logo"
            className=""
          />
          <div className="flex flex-col gap-5">
            <h3 className="text-3xl font-inter text-foreground-base">Lorem ipsum dolor sit amet consectetur.</h3>
            <p className="text-xl text-foreground-muted">Lorem ipsum dolor sit amet consectetur adipisicing elit.<br /> Esse nulla ab molestiae reprehenderit officiis earum mollitia.</p>
          </div>
        </div>

  )
}

export default AsideLoginForm