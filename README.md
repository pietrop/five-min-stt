## 5 min STT

<!-- _One liner + link to confluence page_
_Screenshot of UI - optional_ -->

A module to make STT (Speech to Text) modules, to work on a five minutes turnaround time. Refactored from [autoEdit2](https://opennewslabs.github.io/autoEdit_2/) to use in [autoEdit3](https://www.autoedit.io/).

## Setup

<!-- _stack - optional_
_How to build and run the code/app_ -->

```
git clone git@github.com:pietrop/five-min-stt.git
```

```
cd five-min-stt
```

```
npm install
```

## Usage

### Usage in development

see the example usage in `src/`

### Usage in production

```
npm install five-min-stt
```

```js
const fiveMinStt = require('five-min-stt');
const url = 'https://download.ted.com/talks/KateDarling_2018S-950k.mp4';
const audioFileOutput = './KateDarling_2018S-950k.wav';

const sttTranscribeFunction = async (filePath) => {
  return await assemblyai({ ApiKey, filePath });
};

fiveMinStt({ file: url, audioFileOutput, ffmpegBinPath, ffprobeBinPath, sttTranscribeFunction }).then((resp) => {
  console.log('example usage, fiveMinStt::', JSON.stringify(resp, null, 2));
});
```

optionally you can specify `audioFileOutput`

```js
const audioFileOutput = './KateDarling_2018S-950k.wav';

fiveMinStt({ file: url, audioFileOutput, ffmpegBinPath, ffprobeBinPath, sttTranscribeFunction }).then((resp) => {
  console.log('example usage, fiveMinStt::', JSON.stringify(resp, null, 2));
});
```

Note that `audioFileOutput` - is optional,

- if not provided it creates one in a tmp dir on the system, and the deletes it when done.
- if provided name/path for audio version destination then is developer's responsability to decide if they want to keep or delete the audio file.

## System Architecture

<!-- _High level overview of system architecture_ -->

1. Convert to audio file
2. Split audio file into 5 minutes segments, if over 5 minutes.
3. send segments to STT service
4. re-adjust results by adding offsets to word timings, and combine into one list
5. delete tmp audio segments
6. return resulting transcript

Initially developed to work with [`@pietrop/assemblyai-node-sdk`](https://github.com/pietrop/assemblyai-node-sdk) but tries not to be opinionated about which STT service you use. Altho it assumes the result from the `sttTranscriFunction` has a `words` attribute with word object, with end, start timecodes and text attribute.

```js
{
    "words": [
        {
            "end": 440,
            "start": 0,
            "text": "You",
            ...
        },
        ...
    ]

}
```

<!-- ## Documentation

There's a [docs](./docs) folder in this repository.

[docs/notes](./docs/notes) contains dev draft notes on various aspects of the project. This would generally be converted either into ADRs or guides when ready.

[docs/adr](./docs/adr) contains [Architecture Decision Record](https://github.com/joelparkerhenderson/architecture_decision_record).

> An architectural decision record (ADR) is a document that captures an important architectural decision made along with its context and consequences.

We are using [this template for ADR](https://gist.github.com/iaincollins/92923cc2c309c2751aea6f1b34b31d95) -->

## Development env

 <!-- _How to run the development environment_ -->

- npm > `6.1.0`
- Node 12

Node version is set in node version manager [`.nvmrc`](https://github.com/creationix/nvm#nvmrc)

```
nvm use
```

<!-- _Coding style convention ref optional, eg which linter to use_ -->

<!-- _Linting, github pre-push hook - optional_ -->

### Linting

This repo uses prettier for linting. If you are using visual code you can add the [Prettier - Code formatter](https://github.com/prettier/prettier-vscode) extension, and configure visual code to do things like [format on save](https://stackoverflow.com/questions/39494277/how-do-you-format-code-on-save-in-vs-code).

You can also run the linting via npm scripts

```
npm run lint
```

and there's also a [pre-commit hook](https://github.com/typicode/husky) that runs it too.

## Build

<!-- _How to run build_ -->

_NA_

## Tests

<!-- _How to carry out tests_ -->

_NA_

## Deployment

<!-- _How to deploy the code/app into test/staging/production_ -->

to publish to npm

```
npm run publish:public
```

To do a dry run

```
npm run publish:dry:run
```
