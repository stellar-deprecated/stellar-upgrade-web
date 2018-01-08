import stellar from 'stellar-lib';
import nacl from 'tweetnacl';
import axios from 'axios';

document.getElementById('upgrade').onclick = function() {
  var old_secret = document.getElementById('old_secret').value;
  var new_public = document.getElementById('new_public').value;
  var code = document.getElementById('confirmation_code').value;

  var seed = new stellar.Seed().parse_json(old_secret);
  var keypair = seed.get_key();

  var data = JSON.stringify({
    newAddress: new_public
  });

  var signature = nacl.sign.detached(
    nacl.util.decodeUTF8(data),
    keypair._secret
  );

  signature = nacl.util.encodeBase64(signature);
  var request = {
    data: data,
    publicKey: nacl.util.encodeBase64(keypair._pubkey),
    signature: signature,
    code: code
  };

  if (confirm("Do you confirm upgrading your account to "+new_public+"?")) {
    document.getElementById('upgrade').disabled = true;

    axios.post('https://api.stellar.org/upgrade/upgrade', request)
      .then(function (response) {
        document.getElementById('response').innerText = JSON.stringify(response.body);
      })
      .catch(function (error) {
        document.getElementById('response').innerText = JSON.stringify(error.response.data);
      });
  } 
}
