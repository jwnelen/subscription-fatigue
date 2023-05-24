import Head from 'next/head';
import data from '../data/subscriptions.json';
import Footer from '../components/footer';
import { useState } from 'react';

export default function Home() {
  const [selected, setSelected] = useState(["Netflix"]);

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
        <h1 className='text-3xl mb-10'>
          The Subscription Fatigue 
        </h1>

        <div className='flex'>
        {data.map( (subscription, index) => (
          <div className={`w-96 flex flex-col 
                m-2 p-2 ${selected.includes(subscription.name) ? 'bg-blue-300' : 'bg-white'}
                items-center justify-between border`}
                onClick={() => {
                  if (selected.includes(subscription.name)) {
                    setSelected(selected.filter(item => item !== subscription.name))
                  } else {
                    setSelected([...selected, subscription.name])
                  }
                }}
            key={index}>
            <h2>{subscription.name}</h2>
            <div className='w-12'>
              <img src={subscription.img_link} alt={subscription.name} />
            </div>

            <p>{subscription.std_price}</p>

          </div>)
          )}
          </div>

          <div>
            Total: {currentTotal}
          </div>
        
      </main>

      <Footer/>
    </div>
  )
}
