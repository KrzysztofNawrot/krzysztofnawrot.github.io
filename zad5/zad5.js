async function loadFile() {
  const res = await fetch("faktura.xml");
  const text = await res.text();
  return new DOMParser().parseFromString(text, "text/xml");
}

function fill(xml) {
  document.getElementById("nr").textContent = xml.querySelector("Number").textContent;
  document.getElementById("city").textContent = xml.querySelector("City").textContent;
  document.getElementById("issue-date-1").textContent = xml.querySelector("IssueDate Day").textContent;
  document.getElementById("issue-date-2").textContent = xml.querySelector("IssueDate Year").textContent;
  document.getElementById("finish-date-1").textContent = xml.querySelector("FinishDate Day").textContent;
  document.getElementById("finish-date-2").textContent = xml.querySelector("FinishDate Year").textContent;
  document.getElementById("seller-name").textContent = xml.querySelector("Seller Name").textContent;
  document.getElementById("seller-address-1").textContent = xml.querySelector("Seller Address1").textContent;
  document.getElementById("seller-address-2").textContent = xml.querySelector("Seller Address2").textContent;
  document.getElementById("seller-nip").textContent = xml.querySelector("Seller Nip").textContent;
  document.getElementById("buyer-name").textContent = xml.querySelector("Buyer Name").textContent;
  document.getElementById("buyer-address-1").textContent = xml.querySelector("Buyer Address1").textContent;
  document.getElementById("buyer-address-2").textContent = xml.querySelector("Buyer Address2").textContent;
  document.getElementById("buyer-nip").textContent = xml.querySelector("Buyer Nip").textContent;
  document.getElementById("total-price").textContent = xml.querySelector("TotalPrice").textContent;
  document.getElementById("total-price-word").textContent = xml.querySelector("TotalPriceWord").textContent;
  document.getElementById("paid").textContent = xml.querySelector("Paid").textContent;
  document.getElementById("remaining").textContent = xml.querySelector("Remaining").textContent;
  document.getElementById("receiver").textContent = xml.querySelector("Receiver").textContent;
  document.getElementById("issuer").textContent = xml.querySelector("Issuer").textContent;
  document.getElementById("vat-stake").textContent = xml.querySelector("VatStake").textContent;
  document.getElementById("total-no-tax").textContent = xml.querySelector("TotalNoTax").textContent;
  document.getElementById("vat-total").textContent = xml.querySelector("VatTotal").textContent;
  document.getElementById("total-with-tax").textContent = xml.querySelector("TotalWithTax").textContent;
  document.getElementById("total-no-tax-gr").textContent = xml.querySelector("TotalNoTaxGr").textContent;
  document.getElementById("vat-total-gr").textContent = xml.querySelector("VatTotalGr").textContent;
  document.getElementById("total-with-tax-gr").textContent = xml.querySelector("TotalWithTaxGr").textContent;
}

function fillItems(xml) {
  const container = document.querySelector(".items");
  const items = xml.querySelectorAll("Items Item");
  let index = 1;

  items.forEach(item => {
    const div = document.createElement("div");
    div.className = "item";
    div.id = "item-" + index;

    const fields = [
      ["id", "Id"],
      ["name", "Name"],
      ["tax-free-reason", "TaxFreeReason"],
      ["unit", "Unit"],
      ["amount", "Amount"],
      ["single-item-price", "SingleItemPrice"],
      ["single-item-price-gr", "SingleItemPriceGr"],
      ["item-price", "ItemPrice"],
      ["item-price-gr", "ItemPriceGr"]
    ];

    fields.forEach(([class_name, tag]) => {
      const d = document.createElement("div");
      d.className = class_name;
      d.id = `${class_name}-${index}`;
      d.textContent = item.querySelector(tag).textContent;
      div.appendChild(d);
    });

    container.appendChild(div);
    index++;
  });
}

loadFile().then(xml => {
  fill(xml);
  fillItems(xml);
});
