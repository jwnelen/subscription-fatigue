import Head from 'next/head';
import importedData from '../data/subscriptions.json';
import Footer from '../components/footer';
import Subscription from '../components/subscription'
import { useState } from 'react';

export default function Home() {
  const [data, setData] = useState(importedData);
  const [selected, setSelected] = useState(["Spotify"]);
  // const currentTotal = 0
  const l = data.map(x => x.items)
  const fl = l.flat()
  // console.log(l.flat())
  const currentTotal = selected.reduce((acc, curr) => {
    const subscription = fl.find(item => item.name === curr);
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
          {data.map((category, index) => {
            return (
              <div key={`s-${index}`}>
                <h1 className='text-xl text-left'>{category.category}</h1>
                <div>
                {category.items?.map((subscription, index) => {
                  const s = selected.includes(subscription.name)
                  return (
                  <Subscription
                    subscription={subscription}
                    index={index}
                    selected={s}
                    changePrice={(e) => {
                      console.log(e)}
                    }
                    onClick={() => {
                      if (s) {
                        setSelected(selected.filter(item => item !== subscription.name))
                        } else {
                        setSelected([...selected, subscription.name])
                        }
                    }}
                    />)
                })}
                </div>
            </div>
            )})
            }
            </div>
          <div className='text-xl'>
            Total: &euro;{currentTotal.toFixed(2)}
          </div>
      </main>

      <Footer/>
    </div>
  )
}
