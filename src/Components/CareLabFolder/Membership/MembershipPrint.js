export const printMembership = (cry, small, data, e) => {
  console.log(cry);
  let newWindow = window.open();
  let newStyle = `
    <style>
    .card {
        min-height: 50mm;
        max-width: 80mm;
        max-height: 70mm;
        background-color: #ddf0f9;
        overflow: hidden;
      }
      .logo {
        display: flex;
        height: 18mm;
        width: 80mm;
        background-color: #007cec;
      }
      .logo-left > img {
        height: 18mm;
        width: 18mm;
        background-color: #c8dff3;
      }
      .logo-right {
        margin-top: 2mm;
        margin-left: 2mm;
        padding-top: 0px;
        height: 20mm;
        overflow: hidden;
        margin-bottom: 0mm;
      }
      .logo-right > img {
        height: 10mm;
        width: 20mm;
      }
      .heading {
        background-color: #0d53cb;
        text-align: center;
        color: white;
      }
      .content {
        margin-top: 0px;
        margin-left: 2mm;
      }
      
      .content-top {
        margin-top: 0mm;
        font-size: 4mm;
        display: flex;
        justify-content: space-between;
        margin-bottom: 0mm;
        height: 2mm;
      }
      
      #a {
        margin-right: 10mm;
        font-weight:bold
      
      }
      #c {
      
        font-weight:bold
      }
      #d {
      
        font-weight:bold
      }
      #e {
      
        font-weight:bold
      }
      #f {
      
        font-weight:bold
      }
      .content-mid {
        margin-top: 4mm;
        font-size: 4mm;
        display: flex;
        justify-content: space-between;
        height: 2mm;
      }
      
      #b {
        margin-right: 10mm;
        font-weight:bold
      }
      .content-sec {
        margin-top: 4mm;
        font-size: 4mm;
        display: flex;
        justify-content: space-between;
        height: 2mm;
      }
      .content-last {
        margin-top: 4mm;
        font-size: 4mm;
        display: flex;
        justify-content: space-between;
        height: 2mm;
      }
      
    </style>`;

  let mainBody = `
    <div class="card">
      <div class="logo">
        <div class="logo-left">
          <img src="${small}" alt="" />
        </div>
        <div class="logo-right">
          <img src="${cry}" alt="asdf" />
          <p
            style="
              font-size: 2mm;
              margin-top: 0px;
              margin-bottom: 0px;
              color: white;
            "
          >
            An ISO 9001:2015 Certified Laboratory
          </p>
        </div>
      </div>
      <div class="heading">MEMBERSHIP CARD</div>
      <div class="content">
        <div class="content-top">
          <p style="font-size: 3mm " id="c">Name: ${data.Name}</p>
          <p id="a" style="font-size: 3mm">Membership No.: ${data.MemberCode}</p>
        </div>
        <div class="content-mid" >
          <p style="font-size: 3mm" id="d">Address:${data.Address}</p>
          <p id="b" style="font-size: 3mm" >Mobile No.:${data.ContactNo}</p>
        </div>
        <div class="content-sec">
          <p style="font-size: 3mm" id="e">DOB:${data.DateOfBirth}</p>
        </div>
        <div class="content-last" >
          <p style="font-size: 3mm" id="f">Issue Date:${e}</p>
        </div>
      </div>
    </div>`;

  newWindow.document.body.innerHTML = newStyle + mainBody;

  setTimeout(function () {
    newWindow.print();
    // newWindow.close();
  }, 300);
};
