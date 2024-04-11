export default function AddressInputs({addressProps,setAddressProps,disabled=false}) {
    const {phone ,streetAddress,postalCode ,city,country} = addressProps;
  return (
    <>
      <label>Phone number</label>
      <input
        disabled={disabled}
        type="tel"
        value={phone || ""}
        onChange={(e) => setAddressProps("phone", e.target.value)}
        placeholder="Phone number"
        required
        pattern="[6-9]{1}[0-9]{9}"
        title="Invalid phone number"
      />

      <label>Street address</label>
      <input
        disabled={disabled}
        type="text"
        value={streetAddress || ""}
        onChange={(e) => setAddressProps("streetAddress", e.target.value)}
        placeholder="Street address"
        required
      />

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label>Postal code</label>
          <input
            disabled={disabled}
            type="text"
            placeholder="Postal code"
            value={postalCode || ""}
            onChange={(e) => setAddressProps("postalCode", e.target.value)}
            required
            pattern="[0-9]{6}"
            title="Six digit zip code"
          />
        </div>
        <div>
          <label>City</label>
          <input
            disabled={disabled}
            type="text"
            placeholder="City"
            value={city || ""}
            onChange={(e) => setAddressProps("city", e.target.value)}
            required
          />
        </div>
      </div>

      <label>Country</label>
      <input
        disabled={disabled}
        type="text"
        placeholder="Country"
        value={country || ""}
        onChange={(e) => setAddressProps("country", e.target.value)}
        required
      />
    </>
  );
}
