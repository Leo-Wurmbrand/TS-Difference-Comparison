// Import
import Difference from "./dist/Difference.js";

// Example usage
document.getElementById("check").innerHTML = '<code>{ foo: "bar" }</code> and <code>{ foo: "bar"}</code> are ' + (Difference.isMeaningful({ foo: 'bar' }, { foo: 'bar'}) ? 'different' : 'not different');
