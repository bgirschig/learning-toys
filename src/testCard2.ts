import { getFileName } from "./utils/path";
const modulesMap = loadModuleMap("./test-cards/*.{ts,js}");

function initTestCard(moduleName: string) {
}

class TestCard {
  name: string;
  isDone: boolean;
  el?: HTMLElement;

  constructor(name: string) {
    this.name = name;
    this.isDone = false;
    modulesMap[name]();
  }

  loadHtml(html:string) {
    this.el = this.parseHtml(html);
  }

  parseHtml(html:string) {
    const template = document.createElement("template");
    template.innerHTML = html.trim();
    return template.content.children[0] as HTMLElement;
  }

  success() {
    if (this.isDone) return;
    if (this.el) this.el.classList.add('success');
    
    if (config.confettiOnSuccess) jsConfetti.addConfetti({confettiNumber: 200});
    if (config.soundOnSuccess) playsound(successBell);
    isDone = true;
  }
}

function loadModuleMap(modules_pattern:string) {
  const modules = import.meta.glob(modules_pattern);
  const output:{[key:string]:Function} = {};
  Object.keys(modules).forEach(key => {
    const name = getFileName(key);
    if (name in output) throw new Error(`module name conflict: found multiple modules with name "${name}"`);
    output[name] = () => {
      return modules[key]();
    }
  })
  return output;
}