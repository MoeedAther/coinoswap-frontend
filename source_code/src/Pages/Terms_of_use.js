import React,{useEffect} from 'react'
import '../css/Terms_of_use.css';
import '../css/Terms_of_use_responsive.css';
import Bullet_Point_gold from '../images/Bullet Point Icon Gold.png';
import { Helmet } from 'react-helmet';

function Terms_of_use() {

  useEffect(()=>{
    window.scrollTo(0, 0);
});

  return (
    <>
    <Helmet>
    <title>Terms of Use | CoinoSwap – Crypto Exchange Aggregator Terms</title>
    <meta name="description" content="Review CoinoSwap’s Terms of Use for our non-custodial crypto exchange aggregator. Learn how to trade with ease and stay secure on our platform." />
    </Helmet>
    {/*Terms_of_use section start */}
    <div className="Terms_of_use_section">
        <div className="continer-fluid Terms_of_use_content">
            <h4 className='Terms_heading'>TERMS OF <strong className='policy_yellow'>USE</strong></h4>
            <div className="last_update">
                <span><img src={Bullet_Point_gold} alt="" /></span>
                <span className='last_update_content Terms_heading'>Last Updated: 15 October 2024</span>
            </div>
        </div>
    </div>
    {/*Terms_of_use section end */}

    {/*Terms_of_use section content start */}
     <section className='terms_content'>
        <div className="container-fluid">
            <p className='Terms_para'><strong>CoinoSwap</strong> refers to <strong>Coinoisseurs LLC</strong>, a registered company in Wyoming, USA. Throughout these Terms of Use ("Terms"), "we", "us", and "our" refer to CoinoSwap. These Terms govern your access to and use of our non-custodial cryptocurrency aggregator swap platform (the "Service"). By accessing or using the Service, you agree to be bound by these Terms.
            <strong> If you do not agree to these Terms, you may not access or use the Service.</strong>
            <br/><br/>
            By using the Service, You agree that electronic communication will be the sole means of communication between us. All notifications, documents, and communications will be sent to your provided email address, and any correspondence to us should be sent via similar means. 
            <br/><br/>
            These Terms set forth the complete understanding between the parties concerning the subject matter herein and supersede all prior understandings, agreements, or communications. You also represent and warrant that all information you provide to us in connection with your use of the Service is true, accurate, and complete.</p>
        </div>
     </section>
    {/*Terms_of_use section content end */}

      {/*policy_terms_section start */}
      <section className="terms_points">
        <div className="container-fluid">
          {/*Point_1 section */}
          <div class="terms_section">
          <h1 class="Terms_heading Terms_heading">1. Definitions</h1>
          <ul class="term_list">
              <li><strong>Service:</strong> The non-custodial crypto aggregation platform that allows users to compare and swap cryptocurrencies.</li>
              <li><strong>User:</strong> Any individual or entity accessing or using the Service</li>
              <li><strong>Cryptocurrency:</strong> Any form of digital currency that uses cryptography to secure transactions and control the creation of new units.</li>
              <li><strong>Exchange Partners:</strong> Third-party exchanges that provide cryptocurrency swap services through our platform.</li>
          </ul>
          </div>
          {/*Point_2 section */}
          <div class="terms_section">
          <h1 class="Terms_heading Terms_heading">2. Non-Custodial Service</h1>
          <p className='item_para Terms_para'>We are a non-custodial platform, meaning we do not hold or control any cryptocurrency on behalf of users. All transactions are conducted between users and third-party exchange partners directly. <strong>CoinoSwap</strong> does not store private keys, user funds, or any other assets. You are responsible for maintaining the security and control of your wallet and private keys.</p>
          </div>
          {/*Point_3 section */}
          <div class="terms_section">
          <h1 class="Terms_heading Terms_heading">3. Eligibility</h1>
          <p className='item_para Terms_para'>To use our Service, you must:</p>
          <ul class="term_list">
              <li>Be at least 18 years old or the age of legal majority in your jurisdiction.</li>
              <li>Have the legal capacity to enter into a contract.</li>
              <li>Use the Service for lawful purposes only and comply with all applicable laws, rules, and regulations.</li>
          </ul>
          <p className='item_para Terms_para'>You acknowledge that it is your sole responsibility to determine, report, and remit any applicable taxes related to your use of the Service to the appropriate tax authorities. <strong>CoinoSwap</strong> does not assume any liability for determining whether taxes apply to your transactions or for collecting, reporting, withholding, or remitting any taxes arising from trades or transfers. <strong>CoinoSwap</strong> does not act as your tax agent in any capacity. Use of the Service is prohibited for citizens and residents of the United States of America, as well as individuals and entities located in countries on the United Nations Sanctions List or any equivalent sanctions list. Additionally, any individual or entity subject to trade or economic sanctions or restricted from engaging in trading by law enforcement agencies is prohibited from using the Service. You further represent that you are not a Senior Public Official (SPO) or closely associated with such individuals. Any attempt to access or use the Service from a prohibited jurisdiction is strictly forbidden. In the event of a violation, <strong>CoinoSwap</strong> reserves the right to reject any exchange requests and require the withdrawal of any crypto assets from the platform. If you are using the Service on behalf of a legal entity, you represent and warrant that you are authorized to bind that entity to these Terms.</p>
          </div>
          {/*Point_4 section */}
          <div class="terms_section">
          <h1 class="Terms_heading Terms_heading">4. Acceptable Use</h1>
          <ul class="term_list">
              <span className='list_points'>You agree to use the Service only for legitimate purposes and in a manner consistent with these Terms. You shall not:</span> 
              <li>Use the Service for any illegal or unauthorized purpose, including but not limited to money laundering, financing of terrorism, or other criminal activities</li>
              <li>Engage in any activity that interferes with or disrupts the Service or its associated networks.</li>
              <li>Use any automated means (bots, scrapers, etc.) to access the Service, except as expressly permitted by us.</li>
              <li>Attempt to circumvent or manipulate our Service, fees, or other measures designed to ensure fair usage</li>
          </ul>
          </div>
          {/*Point_5 section */}
          <div class="terms_section">
          <h1 class="Terms_heading Terms_heading">5. Use of Email for Transaction Tracking</h1>
          <p className='item_para Terms_para'>If you provide your email address, <strong>CoinoSwap</strong> will use it exclusively for: </p>
          <ul class="term_list">
              <li>Providing tracking of the transaction you initiate on the platform.</li>
              <li>Sending you a receipt or confirmation upon the successful completion of the transaction.</li>
          </ul>
          <p className='item_para Terms_para'>We will not use your email for marketing purposes unless you opt in separately.</p>
          </div>
          {/*Point_6 section */}
          <div class="terms_section">
          <h1 class="Terms_heading Terms_heading">6. Anti-Money Laundering (AML) Compliance</h1>
          <p className='item_para Terms_para'>While <strong>CoinoSwap</strong> does not conduct direct Anti-Money Laundering (AML) checks, our third party exchange partners may conduct AML checks if certain risk factors are triggered. <br /> You agree to the following regarding AML procedures:</p>
          </div>
          {/*Point_6.1 section */}
          <div class="terms_section">
          <h1 class="inner_point_heading Terms_heading">6.1. Partner Exchange AML Procedures</h1>
          <ul class="term_list">
            <span className='list_points'>Our partner exchanges may, at their sole discretion and in accordance with their own AML policies, conduct checks on transactions if:</span>
            <li>Their risk monitoring systems detect suspicious activity.</li>
            <li>The transaction exceeds certain limits or triggers other risk-based criteria.</li>
            <span className='list_points'>These checks may include, but are not limited to:</span>
            <li>Requests for identification documents.</li>
            <li>Verification of the source of funds.</li>
            <li>Review of the transaction history to detect any potential money laundering or financing  of terrorism.</li>
          </ul>
          </div>
          {/*Point_6.2 section */}
          <div class="terms_section">
          <h1 class="inner_point_heading Terms_heading">6.2. User Obligations</h1>
          <ul class="term_list">
            <span className='list_points'>As a user of the Service, you acknowledge and agree that:</span>
            <li>You are responsible for ensuring that all funds used in transactions are lawful and do not violate any applicable AML laws.</li>
            <li>You will comply with any requests for additional information or documents that may be required by our partner exchanges to complete AML checks. </li>
            <li>You are advised to avoid engaging in any suspicious activity on or through the Service.</li>
          </ul>
          </div>
          {/*Point_6.3 section */}
          <div class="terms_section">
          <h1 class="inner_point_heading Terms_heading">6.3. Suspicious Activity and Transaction Monitoring</h1>
          <p className='item_para Terms_para'><strong>CoinoSwap</strong> reserves the right, but is not obligated, to verify suspicious or large transactions undertaken through the Service. This may include sharing your IP address with the relevant authorities or contacting the applicable exchange partner if necessary.</p>
          </div>
          {/*Point_6.4 section */}
          <div class="terms_section">
          <h1 class="inner_point_heading Terms_heading">6.4. Transaction Delays or Rejections</h1>
          <ul class="term_list">
              <span className='list_points'>In cases where a partner exchange's AML procedures are triggered:</span>
              <li>Your transaction may be delayed or blocked until the necessary information is provided and reviewed.</li>
              <li>
              <strong>CoinoSwap</strong> is not responsible for any delays, cancellations, or rejections of transactions resulting from AML checks conducted by partner exchanges. 
              </li>
              <li>You agree that the partner exchange’s decision to approve or reject a transaction is final, and <strong>CoinoSwap</strong> cannot override or influence such decisions.</li>
          </ul>
          </div>
          {/*Point_6.5 section */}
          <div class="terms_section">
          <h1 class="inner_point_heading Terms_heading">6.5. Reporting Suspicious Activity</h1>
          <p className='item_para Terms_para'>In accordance with applicable AML laws, our partner exchanges may be required to report any suspicious activity or transactions to the relevant authorities. CoinoSwap does not directly report transactions to authorities unless required by law but is not responsible for any reporting obligations of the partner exchanges.</p>
          </div>
          {/*Point_7 section */}
          <div class="terms_section">
          <h1 class="Terms_heading Terms_heading">7. Third-Party Services</h1>
          <ul class="term_list">
              <span className='list_points'>
              <strong>CoinoSwap</strong> aggregates offers from third-party exchange partners. By using our Service, you acknowledge and agree that:</span>
              <li><strong>CoinoSwap</strong> is not responsible for the availability, quality, or accuracy of services provided by third-party exchanges.
              </li>
              <li>Your interactions with third-party services are subject to their own terms and conditions, which you are responsible for reviewing.</li>
              <li>
              <strong>CoinoSwap</strong> does not guarantee the execution of any specific transaction or the performance of any third-party exchange partner.</li>
          </ul>
          </div>
          {/*Point_8 section */}
          <div class="terms_section">
          <h1 class="Terms_heading Terms_heading">8. Transaction Process</h1>
          <ul class="term_list">
              <span className='list_points'>Transactions conducted through the Service are processed as follows:
              </span>
              <li>You will be presented with offers from third-party exchange partners, including exchange rates, fees, and estimated time for completion.</li>
              <li>
              Once you accept an offer, the transaction is broadcasted to the blockchain and is irreversible. Ensure that all transaction details (e.g., wallet addresses, cryptocurrency 
              amounts) are accurate.</li>
              <li>You acknowledge that transactions may be subject to delays or failures due to blockchain network congestion, third-party service issues, or other unforeseen factors.</li>
          </ul>
          </div>
          {/*Point_9 section */}
          <div class="terms_section">
          <h1 class="Terms_heading Terms_heading">9. Fees</h1>
          <ul class="term_list">
              <span className='list_points'><strong>CoinoSwap</strong> does not charge any direct fees for using the Service. However, you may be subject to:
              </span>
              <li> Network fees (i.e., gas fees) required by the underlying blockchain to process the transaction. </li>
              <li>Fees imposed by third-party exchange partners. These fees are typically included in the offer presented to you.</li>
              <li>
              Any applicable taxes or regulatory charges, which you are solely responsible for reporting and paying in accordance with your jurisdiction.</li>
          </ul>
          </div>
          {/*Point_10 section */}
          <div class="terms_section">
          <h1 class="Terms_heading Terms_heading">10. Risks of Cryptocurrency Transactions</h1>
          <ul class="term_list">
              <span className='list_points'>By using the Service, you acknowledge and assume the following risks:
              </span>
              <li><strong>Price Volatility: </strong>The prices of cryptocurrencies are highly volatile and can fluctuate rapidly. You are solely responsible for determining the appropriateness of any transaction. </li>
              <li><strong>Irreversibility: </strong>Cryptocurrency transactions are final once broadcasted to the blockchain. Mistakes in wallet addresses, transaction details, or amounts are irreversible, and CoinoSwap cannot reverse, cancel, or modify any transactions. </li>
              <li> <strong>Regulatory Uncertainty: </strong>Cryptocurrencies are subject to regulatory scrutiny, and laws governing their use may vary by jurisdiction. You are responsible for complying with all relevant legal requirements. </li>
              <li><strong>Technical Risks: </strong> Blockchain networks, exchanges, and wallets are susceptible to hacking, technical failures, and other risks that may result in the loss of your cryptocurrency.</li>
             
          </ul>
          </div>
          {/*Point_11 section */}
          <div class="terms_section">
          <h1 class="Terms_heading Terms_heading">11. Termination</h1>
          <p className='item_para Terms_para'><strong>CoinoSwap</strong> reserves the right to suspend or terminate your access to the Service at our discretion, with or without prior notice, for any reason, including but not limited to the following:</p>
          </div>
           {/*Point_11.1 section */}
           <div class="terms_section">
          <h1 class="inner_point_heading Terms_heading">11.1. Breach of Terms</h1>
          <p className='item_para Terms_para'>If you violate any provision of these Terms, <strong> CoinoSwap</strong> may immediately suspend or terminate your access to the Service.</p>
          </div>
          {/*Point_11.2 section */}
          <div class="terms_section">
          <h1 class="inner_point_heading Terms_heading">11.2. Security Threats</h1>
          <p className='item_para Terms_para'>We may terminate or suspend your access if we detect or suspect that your account or wallet has been compromised, or that your use of the Service poses a security risk.
          </p>
          </div>
          {/*Point_11.3 section */}
          <div class="terms_section">
          <h1 class="inner_point_heading Terms_heading">11.3. Fraud or Suspicious Activity</h1>
          <p className='item_para Terms_para'>We may terminate your access if we suspect involvement in fraudulent, malicious, or suspicious activities, including price manipulation or exploiting the Service.
          </p>
          </div>
          {/*Point_11.4 section */}
          <div class="terms_section">
          <h1 class="inner_point_heading Terms_heading">11.4. Non-Compliance with Legal Requests</h1>
          <p className='item_para Terms_para'>We may terminate access if we are required to comply with a valid court order, law enforcement request, or regulatory obligation.</p>
          </div>
          {/*Point_11.5 section */}
          <div class="terms_section">
          <h1 class="inner_point_heading Terms_heading">11.5. User Misconduct</h1>
          <p className='item_para Terms_para'>Misconduct, including abusive behavior toward <strong>CoinoSwap</strong> staff or other users, may result in termination.</p>
          </div>
          {/*Point_11.6 section */}
          <div class="terms_section">
          <h1 class="inner_point_heading Terms_heading">11.6. Technical or Operational Issues</h1>
          <p className='item_para Terms_para'>Access may be suspended or terminated due to technical issues, maintenance, or downtime affecting the Service.</p>
          </div>
          {/*Point_11.7 section */}
          <div class="terms_section">
          <h1 class="inner_point_heading Terms_heading">11.7. Discretionary Termination</h1>
          <p className='item_para Terms_para'>We reserve the right to terminate access at our discretion, even in the absence of a violation, where necessary to protect the integrity of the platform.</p>
          </div>
          {/*Point_11.8 section */}
          <div class="terms_section">
          <h1 class="inner_point_heading Terms_heading">11.8. Consequences of Termination</h1>
          <p className='item_para Terms_para'>Upon termination, your access to the Service will be revoked, any pending transactions may be cancelled, and any data may be retained in accordance with legal obligations.</p>
          </div>
          {/*Point_12 section */}
          <div class="terms_section">
          <h1 class="Terms_heading Terms_heading">12. Privacy and Data Collection</h1>
          <p className='item_para Terms_para'>Your privacy is important to us. Please review our [Privacy Policy] for information on how we collect, use, and disclose your personal data. <br />
          <strong>Personal Information:</strong> We collect and process information such as wallet addresses, transaction history, and aggregated usage data for analytical purposes. We do not collect private keys or sensitive financial data. <br />
          <strong>Third-Party Tracking:</strong> Our partners may use cookies or other tracking mechanisms to analyze your use of their services. We are not responsible for how third-party services handle your data.</p>
          </div>
          {/*Point_13 section */}
          <div class="terms_section">
          <h1 class="Terms_heading Terms_heading">13. Intellectual Property</h1>
          <p className='item_para Terms_para'>All content, trademarks, service marks, logos, and intellectual property displayed on the Service are the property of <strong>CoinoSwap</strong> or its licensors. You agree not to use, copy, distribute, or exploit any intellectual property rights reserved by <strong>CoinoSwap</strong> without explicit prior written consent from us. You further agree not to bypass, disable, or otherwise interfere with any security features of the Service, including those that restrict or prevent the unauthorized use, copying, or distribution of the Service’s content, or that enforce limitations on its use. Any references on the Service to third-party products, services, processes, or other information—whether by trade name, trademark, manufacturer, supplier, or otherwise—do not imply endorsement, sponsorship, or recommendation by <strong>CoinoSwap</strong> unless explicitly stated otherwise.</p>
          </div>
          {/*Point_14 section */}
          <div class="terms_section">
          <h1 class="Terms_heading Terms_heading">14. Disclaimers and Limitation of Liability</h1>
          <p className='item_para Terms_para'>The Service is provided on an "AS IS" and "AS AVAILABLE" basis without any warranties of any kind, either express or implied. CoinoSwap makes no representations or warranties regarding the accuracy, availability, or reliability of the Service or any third-party services. The exchange rates provided through the Service are not intended to be, and should not be considered, financial or investment advice. These rates cannot be used as a basis for any investment strategy or legal argument in court. CoinoSwap does not guarantee that the rates, or any other information provided, are free from errors, inaccuracies, misrepresentations, or failures. To the fullest extent permitted by law, CoinoSwap and its affiliates shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising <br />from or related to your use of the Service, including but not limited to: </p>
          <ul class="term_list">
            <li>Loss of funds due to errors in transaction details or third-party service failures.</li>
            <li>Loss of access to cryptocurrency due to wallet issues, network congestion, or blockchain failures. </li>
            <li>Any loss of profits, revenue, or business opportunities as a result of using the Service.</li>
          </ul>
          </div>
          {/*Point_15 section */}
          <div class="terms_section">
          <h1 class="Terms_heading Terms_heading">15. Indemnification</h1>
          <p className='item_para Terms_para'>You agree to indemnify and hold harmless <strong>CoinoSwap</strong>, its affiliates, officers, employees, and partners from any claims, damages, liabilities, losses, or expenses (including legal fees) arising out of or related to your use of the Service, your violation of these Terms, or your violation of any applicable law.</p>
          </div>
          {/*Point_16 section */}
          <div class="terms_section">
          <h1 class="Terms_heading Terms_heading">16. Governing Law and Dispute Resolution</h1>
          <p className='item_para Terms_para'>These Terms and any disputes arising out of or related to your use of the Service will be governed by the laws of Wyoming, United States of America. Any disputes will be resolved through binding arbitration in Wyoming, and you waive any right to participate in class action lawsuits.</p>
          </div>
          {/*Point_17 section */}
          <div class="terms_section">
          <h1 class="Terms_heading Terms_heading">17. Modifications to Terms</h1>
          <p className='item_para Terms_para'><strong>CoinoSwap</strong> reserves the right to modify, amend, or update these Terms of Use at any time, without prior notice. It is your responsibility to review these Terms periodically to stay informed of any changes. Continued use of the Service after any modifications signifies your acceptance of the revised Terms. If you do not agree with the updated Terms, you must stop using the Service immediately.</p>
          </div>
        </div>
      </section>
      {/*policy_terms_section end */}
    </>
  )
}

export default Terms_of_use