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
  document.getElementById("paid").textContent = xml.querySelector("Paid").textContent;
  document.getElementById("receiver").textContent = xml.querySelector("Receiver").textContent;
  document.getElementById("issuer").textContent = xml.querySelector("Issuer").textContent;
  document.getElementById("vat-stake").textContent = xml.querySelector("VatStake").textContent;

}

function fillItems(xml) {
  const container = document.querySelector(".items");
  const items = xml.querySelectorAll("Items Item");
  let index = 1;
  let totalNoTax = 0;
  let totalVat = 0;
  let totalWithTax = 0;
  const vatStake = parseFloat(xml.querySelector("VatStake").textContent) / 100;

  items.forEach(item => {
    const div = document.createElement("div");
    div.className = "item";
    div.id = "item-" + index;
    const amount = parseFloat(item.querySelector("Amount").textContent)
    const net = amount * parseFloat(item.querySelector("SingleItemPrice").textContent) + parseFloat(item.querySelector("SingleItemPriceGr").textContent) / 100;
    const vatAmount = net * vatStake;
    const gross = net + vatAmount;

    totalNoTax += net;
    totalVat += vatAmount;
    totalWithTax += gross;
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
  calculateSummary(xml, totalNoTax, totalVat, totalWithTax);
}

loadFile().then(xml => {
  fill(xml);
  fillItems(xml);
});
function calculateSummary(xml, totalNoTax, totalVat, totalWithTax) {
  document.getElementById("total-no-tax").textContent = Math.floor(totalNoTax);
  document.getElementById("total-no-tax-gr").textContent = Math.round((totalNoTax % 1) * 100);
  document.getElementById("vat-total").textContent = Math.floor(totalVat);
  document.getElementById("vat-total-gr").textContent = Math.round((totalVat % 1) * 100);
  document.getElementById("total-with-tax").textContent = Math.floor(totalWithTax);
  document.getElementById("total-with-tax-gr").textContent = Math.round((totalWithTax % 1) * 100);
  let total = (Math.floor(totalWithTax) + (Math.round((totalWithTax % 1) * 100) / 100)).toFixed(2);
  document.getElementById("total-price").textContent = total
  document.getElementById("remaining").textContent = total - parseFloat(xml.querySelector("Paid").textContent);

}
