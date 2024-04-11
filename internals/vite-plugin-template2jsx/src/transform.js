import path from 'node:path'
import fs from 'fs-extra'
import { dirname, walkFileTree, capitalizeKebabCase } from './helpers.js'
import { template } from 'lodash-es'
import { transformVueTemplateToSolid } from './index.js'

const transformVueToSolids = function (transformComponents = ['button']) {
  const vueRootDir = path.resolve(dirname, '../../../packages/vue/src')
  const solidRootDir = path.resolve(dirname, '../../../packages/solid/src')
  const templatePaths = []

  walkFileTree({
    isDeep: true,
    dirPath: path.resolve(dirname, 'template'),
    callback(args) {
      templatePaths.push(args)
    }
  })

  fs.readdirSync(vueRootDir)
    .filter((item) => transformComponents.includes(item))
    .forEach((item) => {
      templatePaths.forEach(({ subPath, file }) => {
        const parentDirs = [file.substring(0, file.length - 1)]

        if (subPath.includes('src')) {
          parentDirs.unshift('src')
        }

        const solidComponentPath = path.join(solidRootDir, item, ...parentDirs)
        const templateContent = fs.readFileSync(subPath, 'utf-8')
        const solidComponentDir = path.join(solidComponentPath, '..')

        if (!fs.existsSync(solidComponentDir)) {
          fs.mkdirSync(solidComponentDir)
        }

        if (file === 'pc.jsxs') {
          const vueComponetPath = path.join(vueRootDir, item, 'src', 'pc.vue')
          const vueContent = fs.readFileSync(vueComponetPath, 'utf-8')
          let jsxContent = transformVueTemplateToSolid(templateContent, vueContent, item)

          fs.writeFileSync(solidComponentPath, jsxContent)
        } else {
          const renderTemplateContent = template(templateContent)({ NAME: item, UPPERNAME: capitalizeKebabCase(item) })
          fs.writeFileSync(solidComponentPath, renderTemplateContent)
        }
      })
    })
}

transformVueToSolids()
