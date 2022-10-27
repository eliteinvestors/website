import React, { useState, useEffect } from "react";
import { auth, db } from "./Firebase";
import "./Navbar";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import Modalbox from "./Modalbox";

function Home() {
  const navigate = useNavigate();

  const propertiesCollectionRef = collection(db, "properties");
  const [properties, setProperties] = useState([]);
  const [status, setStatus] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [modalId, setModalId] = useState("")

  const updateStatus = async (id, status, btn) => {
    if (status == "Accepting Offers") {
      const newStatus = properties.map((obj) => {
        if (obj.id == id) {
          return { ...obj, status: "Reserved" };
        } else {
          return { ...obj };
        }
      });
      setProperties(newStatus);
      const newProperties = doc(db, "properties", id);
      updateDoc(newProperties, {
        status: "Reserved",
        click: btn,
        date_time: Date(),
      }).catch((error) => {
        console.log(error.message);
      });
    }
    //await updateDoc(properties )
  };

  const updateBtn = async (id, btn) => {
    const newProperties = doc(db, "properties", id);
    updateDoc(newProperties, {
      click: btn,
      date_time: Date(),
    }).catch((error) => {
      console.log(error.message);
    });
    setModalId(id);
    console.log(modalId)
  };



  useEffect(() => {
    console.log(modalId)
    const getProperties = async () => {
      const data = await getDocs(propertiesCollectionRef);
      console.log(data);

      setProperties(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setStatus(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.warn(properties);
    };
    getProperties();
  }, []);

  return (
    <>
      <Navbar />
      <div class="container1">
        <h1>Current Opportunities</h1>
      </div>
      <div className="dashboard-box">
        {properties.map((properties) => {
          return (
            <div className="outer-box">
              {properties.status == "Accepting Offers" ? (
                <div className="img-box-accepting">
                  <p>{properties.status}</p>
                  <img
                    src={properties.photo_front}
                    alt="photo"
                    className="prop-img"
                  />
                </div>
              ) : null}

              {properties.status == "Seeking Partner" ? (
                <div className="img-box-seeking">
                  <p>{properties.status}</p>
                  <img
                    src={properties.photo_front}
                    alt="photo"
                    className="prop-img"
                  />
                </div>
              ) : null}

              {properties.status == "Reserved" ? (
                <div className="img-box-reserved">
                  <p>{properties.status}</p>
                  <img
                    src={properties.photo_front}
                    alt="photo"
                    className="prop-img"
                  />
                </div>
              ) : null}

              {properties.status == "Pending" ? (
                <div className="img-box-pending">
                  <p>{properties.status}</p>

                  <img
                    src={properties.photo_front}
                    alt="photo"
                    className="prop-img"
                  />
                </div>
              ) : null}

              {properties.status == "Sold" ? (
                <div className="img-box-sold">
                  <p>{properties.status}</p>

                  <img
                    src={properties.photo_front}
                    alt="photo"
                    className="prop-img"
                  />
                </div>
              ) : null}
              <div className="text-box">
                <h5>
                  <b>Address:</b> {properties.address} , {properties.zip}{" "}
                  <br></br>
                  <br></br>
                  <b>Bed :</b> {properties.beds} <b> Baths : </b>{" "}
                  {properties.baths} <b> Size :</b> {properties.size}
                  <br></br>
                  <b>Asking Price :</b> {properties.asking_price}
                  <br></br>
                  <b>ARV : </b> {properties.arv}
                  <br></br>
                  <b>Current Rent : </b>
                  {properties.current_rent} <br></br>
                  <b>Prospective Rent : </b> {properties.prospective_rent}
                  <br></br>
                  <b>Estimated Repairs : </b> {properties.estimated_repairs}
                </h5>
              </div>
              <div>
                <ul className="button-box">
                  <li>
                    <a
                      onClick={() => {
                        updateBtn(properties.id, "comps analysis");
                      }}
                      href={properties.comps_url}
                      target="_blank"
                      download
                    >
                      <button
                        onClick={() => {
                          updateBtn(properties.id, "comps analysis");
                        }}
                      >
                        Comps Analysis
                      </button>
                    </a>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        updateStatus(
                          properties.id,
                          properties.status,
                          "submit offer"
                        );
                      }}
                    >
                      Submit Offer
                    </button>
                  </li>
                  <li>
                    <button>Seeking Partner</button>
                  </li>
                  <li>
                    <div>
                      <button
                        onClick={() => {
                          updateBtn(properties.id, "decline");
                          // setIsOpen(true);
                        }}
                      >
                        Decline
                      </button>
                      <Modalbox open={modalId==properties.id} onClose={() => setModalId("")}>
                        <h6>Please Select the reason(s) you are declining</h6>
                      </Modalbox>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          );
        })}
      </div>
      {/*<button
        className="signout"
        onClick={() => {
          auth.signOut();
          navigate("/");
        }}
      >
        Signout
    </button>*/}
    </>
  );
}
export default Home;
