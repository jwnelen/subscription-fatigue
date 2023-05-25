import Head from 'next/head';
import importedData from '../data/subscriptions.json';
import Footer from '../components/footer';
import { useState } from 'react';

export default function Home() {
  const [data, setData] = useState(importedData);
  const [selected, setSelected] = useState(["Spotify"]);

  const currentTotal = selected.reduce((acc, curr) => {
    const subscription = data.find(item => item.name === curr);
    return acc + subscription.std_price;
  }, 0);

  return (
    <div>
      <Head>
        <title>Subscriptions Fatigue</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='text-center m-2'>
        <h1 className='text-3xl my-10'>
          The Subscription Fatigue 
        </h1>

        <div className='container mx-auto'>
          <div className='flex flex-wrap justify-center'>
          {data.map( (subscription, index) => (
            <div className={`flex flex-col items-center justify-between
                  rounded border p-2 w-64 h-40 m-4 outline outline-1 
                  ${selected.includes(subscription.name) ? 'outline-4 outline-blue-500' : 'outline-gray-400'}
                   `}
              key={index}>
                <div className='w-100 h-full p-2 flex flex-col cursor-pointer items-center justify-between'
                onClick={() => {
                  if (selected.includes(subscription.name)) {
                    setSelected(selected.filter(item => item !== subscription.name))
                  } else {
                    setSelected([...selected, subscription.name])
                  }
                }}>
                  <h2 className='text-xl'>{subscription.name}</h2>
                  <div className=''>
                    <img className='object-contain'  width={120} height={30} src={subscription.img_link} alt={subscription.name} />
                  </div>
              </div>
              <p>{subscription.std_price}</p>

            </div>)
            )}
            </div>
          </div>

          <div className='text-xl'>
            Total: &euro;{currentTotal.toFixed(2)}
          </div>
      </main>

      <Footer/>

    </div>
  )
}
