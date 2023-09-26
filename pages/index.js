import Head from "next/head";
import importedData from "../data/subscriptions.json";
import Footer from "../components/footer";
import Subscription from "../components/subscription";
import { useState } from "react";
import DisplayTotal from "../components/totalDisplay";
import { Button } from "flowbite-react";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const [data, setData] = useState(importedData);

  const categories = data.map((x) => x.category);
  let uniqueCategories = [...new Set(categories)];

  const currentTotal = data.reduce((acc, curr) => {
    const subscription = data.find((item) => item.id === curr.id);
    return acc + (isNaN(subscription.std_price) ? 0 : subscription.std_price);
  }, 0);

  const add = () => {
    // setTheArray(oldArray => [...oldArray, newElement]);

    setData((d) => [
      ...d,
      {
        category: "New category",
        name: "New subscription",
        std_price: 0,
        id: uuidv4(),
      },
    ]);
  };

  return (
    <div>
      <Head>
        <title>Subscriptions Fatigue</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="text-center">
        <h1 className="text-3xl my-10">The Subscription Fatigue</h1>

        <div className="container mx-auto h-full mb-20">
          {uniqueCategories.map((category, index) => {
            return (
              <div key={`s-${index}`}>
                <h1 className="text-xl font-bold text-center">{category}</h1>
                <div>
                  {data
                    .filter((x) => x.category === category)
                    .map((subscription, index) => {
                      return (
                        <Subscription
                          subscription={subscription}
                          index={index}
                          key={`s-${index}`}
                          deleteSubscription={() => {
                            g;
                            setData((d) =>
                              d.filter((item) => item.id !== subscription.id)
                            );
                          }}
                          setSubscription={(newSubscription) => {
                            setData((d) => {
                              const newSubscriptions = d.map((item) => {
                                if (item.id === subscription.id) {
                                  return newSubscription;
                                } else {
                                  return item;
                                }
                              });
                              return newSubscriptions;
                            });
                          }}
                        />
                      );
                    })}
                </div>
              </div>
            );
          })}
          <div className="mt-20 mb-32 flex justify-center">
            <Button
              className="text-xl p-2 bg-blue-500 rounded"
              onClick={() => add()}
            >
              Add new subscription
            </Button>
            <br></br>
          </div>
        </div>

        <DisplayTotal total={currentTotal}></DisplayTotal>
      </main>
      <Footer />
    </div>
  );
}
