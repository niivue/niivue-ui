# NiiVue UI

# WARNING: this repo is a demo and is not very active anymore. Please see [niivue-apps](https://github.com/niivue/niivue-apps/tree/main) for a more active project. 

[NiiVue](https://github.com/niivue/niivue) is a WebGL 2.0 medical image viewer for web environments. This user interface (UI) project (NiiVue UI) is a reference implementation of how controls (sliders, buttons, inputs) can be used to interact with core NiiVue functions. 

This user interface extends NiiVue and allows user friendly interactions with medical images. We use React for our frontend framework, and React MUI for the material design controls. 

# Active Projects

Our active projects are always visible [here](https://github.com/orgs/niivue/projects)

# Projects and People using NiiVue

- [Center for the Study of Aphasia Recovery](https://cstar.sc.edu/) (University of South Carolina)
- [Wellcome Centre for Integrative Neuroimaging](https://www.win.ox.ac.uk/) (University of Oxford)


# Requirements for NiiVue to work  

- WebGL 2.0 enabled web browser (Chrome, FireFox or Safari Technology Preview).
- macOS and iOS users/developers may need to enable WebGL 2.0 in their Safari settings (Safari < 15).

# Contributors

- [Taylor Hanayik](https://github.com/hanayik)
- [Chris Rorden](https://github.com/neurolabusc)
- [Christopher Drake](https://github.com/cdrake)

*To add yourself please create a PR

# Funding

- 2021-2022
  - P50 DC014664/DC/NIDCD NIH HHS/United States

## Local Development

- Make sure you have nodejs and npm installed
- `git clone git@github.com:niivue/niivue-ui.git`
- `cd niivue-ui`
- `npm install`

Source code can be found in `src/`.

### Serving during development

```
npm run dev
```

## Build

```
npm run build
```


## Versioning

NiiVue-ui uses [semantic versioning](https://semver.org/). 

To update the version run:

```
npm version patch # options are: major | minor | patch
```

# Contributing

All contributions are encouraged and welcomed. Feel free to update documentation, add features, fix bugs, or just ask questions on the [issue board](https://github.com/niivue/niivue-ui/issues). 

## Using Issues

**All** contributions should start as a new issue on the [NiiVue issue board](https://github.com/niivue/niivue-ui/issues). 

By starting a new issue for everything we ping everyone watching the project at the same time, and therefore alerting them to the feature, bug, or question. It also gives everyone a change to comment on new posts. 

## Things to consider

When adding features please keep in mind that we want NiiVue to work on all devices that support WebGL 2.0 (laptops, desktops, tablets, and phones). Therefore, please do your best to test features on as many devices as you have access to. 

When testing locally from other devices you can navigate to your development computer's local IP address (assuming your phone and computer are on the same local network) at the port specified in the URL printed to the terminal.

## Protected branches

The `main` branch is protected. This means that no one can commit to main directly. All edits must be merged in from forks or feature branches. 
