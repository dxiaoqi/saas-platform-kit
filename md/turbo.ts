/**
 * Turborepo 配置详解
 */

interface TurboConfig {
  // 全局依赖：影响所有任务的缓存
  globalDependencies: string[];
  // 全局环境变量：这些环境变量的变化会影响缓存
  globalEnv: string[];
  // 任务管道配置
  tasks: {
    [taskName: string]: TaskConfig;
  };
}

interface TaskConfig {
  // 依赖的其他任务
  dependsOn?: string[];
  // 输出文件位置
  outputs?: string[];
  // 是否缓存
  cache?: boolean;
  // 是否为持久运行的任务
  persistent?: boolean;
  // 影响该任务的环境变量
  env?: string[];
  // 输入文件
  inputs?: string[];
}

/**
 * dependsOn 特殊语法说明：
 * 
 * ^build - 表示依赖所有工作空间依赖项的 build 任务
 * build - 表示依赖当前包的 build 任务
 * $build - 表示仅依赖当前包的 build 任务
 */

/**
 * outputs 配置最佳实践：
 * 
 * 1. 明确指定所有输出目录
 * 2. 使用 ! 排除不需要缓存的文件
 * 3. 包含构建产物和缓存文件
 * 
 * 示例：
 * outputs: [
 *   "dist/**",
 *   ".next/**",
 *   "!.next/cache/**",
 *   "coverage/**"
 * ]
 */

/**
 * 缓存策略最佳实践：
 * 
 * 1. 开发相关任务（dev, clean）设置 cache: false
 * 2. 构建任务（build, test）启用缓存
 * 3. 正确配置 globalDependencies 和 env
 * 4. 使用 inputs 精确控制缓存依赖
 */