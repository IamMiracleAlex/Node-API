
import { bundle } from '@adminjs/bundler';


(async () => {
  const files = await bundle({
    customComponentsInitializationFilePath: 'src/index.ts',
    destinationDir: 'src/public',
  });

  console.log(files);
  // do something with built files here
})();

