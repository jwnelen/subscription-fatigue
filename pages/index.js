import Head from 'next/head';
import importedData from '../data/subscriptions.json';
import Footer from '../components/footer';
import { useState } from 'react';

export default function Home() {
  const [data, setData] = useState(importedData);
  const [selected, setSelected] = useState([]);

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
          <div className='flex flex-wrap'>
          {data.map( (subscription, index) => (
            <div className={`flex flex-col w-1/4 h-32 m-4
                  p-2 ${selected.includes(subscription.name) ? 'bg-blue-300' : 'bg-white'}
                  items-center justify-between border`}
                  onClick={() => {
                    if (selected.includes(subscription.name)) {
                      setSelected(selected.filter(item => item !== subscription.name))
                    } else {
                      setSelected([...selected, subscription.name])
                    }
                  }}
              key={index}>
              <h2 className='text-xl'>{subscription.name}</h2>
              <div className='w-12'>
                <img src={subscription.img_link} alt={subscription.name} />
              </div>

              <p>{subscription.std_price}</p>

            </div>)
            )}
            </div>
          </div>

          <div className='text-xl'>
            Total: {currentTotal}
          </div>
        
      </main>

      <Footer/>
    </div>
  )
}
