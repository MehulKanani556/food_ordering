"use client";
import EditableImage from "@/components/layout/EditableImage";
import { useState } from "react";
import { useProfile } from "../UseProfile";
import AddressInputs from "@/components/layout/AddressInputs";
import Link from "next/link";
export default function UserForm({ user, onSave }) {
  const [userName, setUserName] = useState(user?.userName || "");
  const [image, setImage] = useState(user?.image || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [streetAddress, setStreetAddress] = useState(user?.streetAddress || "");
  const [postalCode, setPostalCode] = useState(user?.postalCode || "");
  const [city, setCity] = useState(user?.city || "");
  const [country, setCountry] = useState(user?.country || "");
  const [admin, setAdmin] = useState(user?.admin || false);
  const { data: loggedInUserData } = useProfile();

  function handleAddressChange(propName, value) {
    if(propName === 'phone') setPhone(value);
    if(propName === 'streetAddress') setStreetAddress(value);
    if(propName === 'postalCode') setPostalCode(value);
    if(propName === 'city') setCity(value);
    if(propName === 'country') setCountry(value);
  }
  return (
    <div className="md:flex gap-4 ">
      <div>
        <div className="p-2 rounded-lg relative max-w-[120px] ">
          <EditableImage link={image} setLink={setImage} />
        </div>
      </div>
      <form
        className="grow"
        onSubmit={(e) =>
          onSave(e, {
            name: userName,
            image,
            phone,
            streetAddress,
            postalCode,
            city,
            country,
            admin,
          })
        }
      >
        <label>First and last name</label>
        <input
          type="text"
          placeholder="First and last name"
          value={user?.name}
          onChange={(e) => setUserName(e.target.value)}
        />

        <label>Email</label>
        <input type="email" placeholder="email" value={user.email} disabled />

        <AddressInputs
          addressProps={{ phone, streetAddress, postalCode, city, country }}
          setAddressProps={handleAddressChange}
        />
        {loggedInUserData.admin && (
          <div>
            <label
              htmlFor="adminCb"
              className="p-2 inline-flex items-center mb-2 gap-2"
            >
              <input
                id="adminCb"
                type="checkbox"
                className=""
                value={"1"}
                checked={admin}
                onChange={(e) => setAdmin(e.target.checked)}
              />
              <span>Admin</span>
            </label>
          </div>
        )}
        <Link href={"/forgot"} className="text-gray-500">
          Forgot password{" "}
        </Link>
        <button type="submit" className="mt-4">Save</button>
      </form>
    </div>
  );
}
