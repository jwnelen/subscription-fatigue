import Head from 'next/head';
import importedData from '../data/subscriptions.json';
import Footer from '../components/footer';
import Subscription from '../components/subscription'
import { useState } from 'react';
import DisplayTotal from '../components/totalDisplay';

export default function Home() {
  const [data, setData] = useState(importedData);
  const [selected, setSelected] = useState(["Spotify"]);
  const l = data.map(x => x.items)
  const fl = l.flat()
  const currentTotal = selected.reduce((acc, curr) => {
    const subscription = fl.find(item => item.name === curr);
    return acc + ( isNaN(subscription.std_price) ? 0 : subscription.std_price);
  }, 0);

  return (
    <div>
      <Head>
        <title>Subscriptions Fatigue</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='text-center'>
        <h1 className='text-3xl my-10'>
          The Subscription Fatigue 
        </h1>

        
        <div className='container mx-auto h-full mb-20'>
          {data.map((category, index) => {
            return (
              <div key={`s-${index}`}>
                <h1 className='text-xl font-bold text-center'>{category.category}</h1>
                <div>
                {category.items?.map((subscription, index) => {
                  const s = selected.includes(subscription.name)
                  return (
                  <Subscription
                    subscription={subscription}
                    index={index}
                    selected={s}
                    key={`s-${index}`}
                    changePrice={(e) => {
                      // Set the price of the subscription
                      let newPrice = e.target.value

                      try {
                        newPrice = parseFloat(newPrice)
                      } catch (error) {
                        newPrice = subscription.std_price
                      }
                      const newData = data.map((cat) => {
                        return {
                          ...cat,
                          items: cat.items.map((sub) => {
                            if (sub.name === subscription.name) {
                              return {
                                ...sub,
                                std_price: newPrice,
                              };
                            }
                            return sub;
                          }),
                        };
                      })
                      setData(newData)
                    }}
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

        <DisplayTotal total={currentTotal}></DisplayTotal>
          
      </main>
      <Footer/>
    </div>
  )
}
